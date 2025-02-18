'use client'

export default function Home() {
  const onClickToPushNotification = async () => {
    await fetch('/api/push/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: 'Push通知の本文',
      }),
    })
  }

  return (
    <>
      <h1>サービスワーカーでのPush通知の実装</h1>
      <button onClick={onClickToPushNotification}>通知を送ってもらう</button>
    </>
  )
}
