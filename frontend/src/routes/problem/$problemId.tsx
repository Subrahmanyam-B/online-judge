import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/problem/$problemId')({
  component: () => <div>Hello /problem/$problemId!</div>
})