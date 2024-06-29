import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/submissions')({
  component: () => <div>Hello /submissions!</div>
})