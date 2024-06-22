import Docker from 'dockerode';
import fs from 'fs/promises';
import path from 'path';

const docker = new Docker();

interface SandboxResult {
  output: string;
  runtime: number;
  memoryUsage: number;
}

async function runInSandbox(code: string, input: string, languageId: number): Promise<SandboxResult> {
  const tempDir = path.join(__dirname, '../../temp');
  const fileName = `submission_${Date.now()}`;

  try {
    await fs.mkdir(tempDir, { recursive: true });

    const { dockerImage, compileCommand, runCommand } = getLanguageConfig(languageId);

    // Write code and input to files
    await fs.writeFile(path.join(tempDir, `${fileName}.code`), code);
    await fs.writeFile(path.join(tempDir, `${fileName}.input`), input);

    // Create a Docker container
    const container = await docker.createContainer({
      Image: dockerImage,
      Cmd: ['/bin/bash'],
      AttachStdin: false,
      AttachStdout: true,
      AttachStderr: true,
      Tty: true,
      HostConfig: {
        Binds: [`${tempDir}:/app`],
        Memory: 128 * 1024 * 1024, // 128 MB
        MemorySwap: 128 * 1024 * 1024, // 128 MB
        NanoCpus: 1 * 1000000000, // 1 CPU
      },
      WorkingDir: '/app',
    });

    await container.start();

    try {
      // Compile if necessary
      if (compileCommand) {
        await executeInContainer(container, compileCommand.replace('{fileName}', fileName));
      }

      // Run the code
      const startTime = process.hrtime();
      const { output, exitCode } = await executeInContainer(
        container,
        runCommand.replace('{fileName}', fileName)
      );
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const runtime = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds

      // Get container stats
      const stats = await container.stats({ stream: false });
      const memoryUsage = stats.memory_stats.usage / 1024; // Convert to KB

      if (exitCode !== 0) {
        throw new Error(`Execution failed with exit code ${exitCode}`);
      }

      return { output, runtime, memoryUsage };
    } finally {
      // Ensure container is stopped and removed
      await container.stop();
      await container.remove();
    }
  } catch (error) {
    console.error('Error during sandbox execution:', error);
    throw error;
  } finally {
    // Clean up temporary files
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

function getLanguageConfig(languageId: number): { dockerImage: string; compileCommand: string; runCommand: string } {
  switch (languageId) {
    case 1: // Python
      return {
        dockerImage: 'python:3.9-slim',
        compileCommand: '',
        runCommand: 'python {fileName}.code < {fileName}.input'
      };
    case 2: // C++
      return {
        dockerImage: 'gcc:latest',
        compileCommand: 'g++ {fileName}.code -o {fileName}',
        runCommand: './{fileName} < {fileName}.input'
      };
    default:
      throw new Error(`Unsupported language ID: ${languageId}`);
  }
}

async function executeInContainer(container: Docker.Container, command: string): Promise<{ output: string; exitCode: number }> {
  const exec = await container.exec({
    Cmd: ['bash', '-c', command],
    AttachStdout: true,
    AttachStderr: true
  });

  const stream = await exec.start({ hijack: true, stdin: false });

  return new Promise((resolve, reject) => {
    let output = '';
    stream.on('data', (chunk) => {
      output += chunk.toString();
    });

    stream.on('end', async () => {
      try {
        const { ExitCode } = await exec.inspect();
        resolve({ output, exitCode: ExitCode });
      } catch (error) {
        reject(error);
      }
    });

    stream.on('error', reject);
  });
}

export { runInSandbox };

