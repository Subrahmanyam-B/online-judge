import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/problems')({
  component: () => <div>Hello /problems/root!</div>
})