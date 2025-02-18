import { NextResponse } from 'next/server'
import { sendNotification, setVapidDetails } from 'web-push'

export async function POST(req: Request, res: Response) {
  const { body: payload } = await req.json()

  const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? '',
    privateKey: process.env.NEXT_PRIVATE_VAPID_KEY ?? '',
  }

  setVapidDetails(
    `mailto:${process.env.NEXT_PUBLIC_VAPID_EMAIL ?? ''}`,
    vapidKeys.publicKey,
    vapidKeys.privateKey,
  )

  // リクエストボディからPush通知購読情報を取得
  const pushSubscription = {
    endpoint: process.env.NEXT_PUBLIC_PUSH_SUBSCRIPTION_ENDPOINT ?? '',
    keys: {
      p256dh: process.env.NEXT_PUBLIC_PUSH_SUBSCRIPTION_KEYS_P256DH ?? '',
      auth: process.env.NEXT_PUBLIC_PUSH_SUBSCRIPTION_KEYS_AUTH ?? '',
    },
  }

  let error

  try {
    await sendNotification(pushSubscription, payload)
  } catch (error) {
    error = error
  }

  if (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Push通知の送信に失敗しました' }),
      { status: 500 },
    )
  } else {
    return new NextResponse(
      JSON.stringify({ message: 'Push通知を送信しました' }),
      { status: 200 },
    )
  }
}
