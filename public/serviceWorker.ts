self.addEventListener('push', (event: PushEvent) => {
  if (event.data) {
    const body = event.data.text()
    const options = {
      body,
    }

    event.waitUntil(
      self.registration
        .showNotification('Push通知タイトル', options)
        .then(() => {
          console.log('Push通知を表示しました')
        })
        .catch((error) => {
          console.error('Push通知の表示に失敗しました', error)
        }),
    )
  } else {
    console.error('Push event but no data')
  }
})
