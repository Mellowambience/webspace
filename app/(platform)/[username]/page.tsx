// Dynamic public profile page rendered using the user's active template
interface Props {
  params: { username: string }
}

export default async function ProfilePage({ params }: Props) {
  const { username } = params
  // TODO: Fetch user profile + active template from Supabase
  // TODO: Render the template with user's content blocks injected

  return (
    <div className="min-h-screen">
      {/* Template iframe or server-rendered template component */}
      <p className="p-10 text-ws-ink/40">Loading {username}&apos;s space...</p>
    </div>
  )
}
