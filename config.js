let api = 'https://node1.0xvoice.com'
if (/localhost/.test(document.location.href)) {
  api = 'http://192.168.31.185:9001'
}

export default {
  api,
  wallet: {
    auth_message: `I authorize publishing on ECHO from this device with my account: ADDRESS\n\nI accept the Terms of Service: https://0xecho.com/tos\n\nIssued At: TIMESTAMP\nPublic Key: PUBLIC_KEY`,
  }
}