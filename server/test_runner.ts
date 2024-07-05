import Docker from "dockerode";
import path from "path";

const docker = new Docker();

const buildImage = async (dockerfile: string, tag: string): Promise<void> => {

  const stream = await docker.buildImage(
    {
      context: path.join(__dirname, "Dockerfiles"),
      src: [dockerfile],
    },
    {
      t: tag,
      dockerfile: dockerfile,
      buildargs: {},
      registryconfig: {},
      nocache: false,
    }
  );

  await new Promise((resolve, reject) => {
    docker.modem.followProgress(stream, (err, res) =>
      err ? reject(err) : resolve(res)
    );
  });

  console.log(`Image ${tag} built successfully`);
};

const runContainer = async (
  image: string,
  command: string[],
  input: string,
  testFile: string
): Promise<string> => {
  const container = await docker.createContainer({
    Image: image,
    Cmd: command,
    Tty: true,
    OpenStdin: true,
    HostConfig: {
      Binds: [`${path.join(__dirname, "test_codes")}:/app`],
    },
  });

  await container.start();

  const exec = await container.exec({
    Cmd: command,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
  });

  const stream = await exec.start({ hijack: true, stdin: true });

  return new Promise((resolve, reject) => {
    let output = "";

    stream.on("data", (chunk) => {
      output += chunk.toString();
    });

    stream.on("end", () => {
      resolve(output.trim());
    });

    stream.on("error", (err) => {
      reject(`Error: ${err.message}`);
    });

    stream.write(input);
    stream.end();

    container.stop().then(() => container.remove());
  });
};

const runContainerWithTimeout = async (
  image: string,
  command: string[],
  input: string,
  testFile: string,
  timeout: number
): Promise<string> => {
  return Promise.race([
    runContainer(image, command, input, testFile),
    new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error("Execution timed out")), timeout)
    )
  ]);
};

const testLanguage = async (
  language: string,
  image: string,
  command: string[],
  filepath: string,
  timeout: number = 5000 // Default timeout of 5 seconds
): Promise<void> => {
  console.log(`Testing ${language}...`);
  const input = "World";
  try {
    const result = await runContainerWithTimeout(image, command, input, filepath, timeout);
    console.log(`Input: ${input}`);
    console.log(`Output: ${result}`);
  } catch (error) {
    if (error instanceof Error && error.message === "Execution timed out") {
      console.log(`${language} execution timed out after ${timeout}ms`);
    } else {
      console.error(`Error in ${language} execution:`, error);
    }
  }
  console.log("------------------------");
};

const main = async () => {
  try {
    // Build images
    await buildImage("cpp.Dockerfile", "cpp-test");
    await buildImage("python.Dockerfile", "python-test");
    await buildImage("java.Dockerfile", "java-test");

    // Test C++
    await testLanguage(
      "C++",
      "cpp-test",
      ["sh", "-c", "g++ /app/test.cpp -o /app/test && /app/test"],
      "test_codes/test.cpp",
      10000 // 10 seconds timeout
    );

    // Test Python
    await testLanguage(
      "Python",
      "python-test",
      ["python", "/app/test.py"],
      "test_codes/test.py",
      5000 // 5 seconds timeout
    );

    // Test Java
    await testLanguage(
      "Java",
      "java-test",
      ["sh", "-c", "javac /app/Test.java && java -cp /app Test"],
      "test_codes/Test.java",
      15000 // 15 seconds timeout
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
