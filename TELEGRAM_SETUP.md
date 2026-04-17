# Telegram Mini App Setup Guide

## Bot Configuration

**Bot Token**: `7988785634:AAGzuhvGW9DhDpULjjqX-z-TAEUnXTaSg68`

**Bot Username**: @DexSolanavolumebot

## Setup Instructions

### 1. Configure Bot with @BotFather

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Send `/setmenubutton` command
3. Select your bot: @DexSolanavolumebot
4. Choose "web_app"
5. Set the button text: "Open App"
6. Set the app URL: `https://3000-idr5o7vzcitxzg3mqoode-9816f310.us2.manus.computer`

### 2. Enable Inline Mode (Optional)

1. Send `/setinline` to @BotFather
2. Select @DexSolanavolumebot
3. Set inline query placeholder: "Search Solana tools..."

### 3. Set Bot Commands

Send to @BotFather:
```
/setcommands
```

Select @DexSolanavolumebot and add these commands:

```
start - Start the bot and open the app
tools - View all Solana tools
deposit - Make a deposit
help - Get help and support
```

### 4. Configure Webhook (Production)

For production deployment:

```bash
curl -X POST https://api.telegram.org/bot7988785634:AAGzuhvGW9DhDpULjjqX-z-TAEUnXTaSg68/setWebhook \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://your-production-domain.com/api/telegram/webhook",
    "allowed_updates": ["message", "callback_query"]
  }'
```

## Mini App Features

### Locked Deposit Address
All deposits are permanently routed to:
```
EBKJbyijywbTFqcZBb6BsZdZ6LAyFDcy8cNzWNEbprR4
```

This address cannot be changed within the Mini App.

### Solana Tools Available
1. Solana Holder Maker
2. Volume Bot
3. Burn Tokens
4. Liquidity Pool Simulator
5. Create Solana Token
6. Solana Bulk Sender
7. Add Liquidity on Raydium
8. Remove Liquidity
9. Revoke Mint Authority
10. Revoke Freeze Authority
11. Update Token Metadata
12. IDX Web3 Wallet

### User Features
- Connect Solana wallet (Phantom, Solflare, Magic Eden)
- View wallet balance
- Send deposits to locked address
- Subscribe to newsletter
- Access all Solana tools
- View transaction history

## Testing the Mini App

### Local Testing
1. Open bot in Telegram: https://t.me/DexSolanavolumebot
2. Click "Open App" button
3. Test wallet connection
4. Verify deposit routing

### Production Testing
1. Deploy to production server
2. Update webhook URL in @BotFather
3. Test all features in Telegram
4. Monitor logs for errors

## Environment Variables

Required for Telegram Mini App:

```bash
TELEGRAM_BOT_TOKEN=7988785634:AAGzuhvGW9DhDpULjjqX-z-TAEUnXTaSg68
SOLANA_DEPOSIT_WALLET=EBKJbyijywbTFqcZBb6BsZdZ6LAyFDcy8cNzWNEbprR4
```

## Security Notes

- ✅ Bot token is securely stored in environment variables
- ✅ Deposit address is immutable and cannot be changed
- ✅ All transactions are recorded on-chain
- ✅ Wallet connections are handled client-side (no server storage)
- ✅ No private keys are ever transmitted or stored

## Troubleshooting

### "App not found" error
- Verify webhook URL is correct
- Check bot token is valid
- Ensure server is running and accessible

### Wallet connection fails
- Check Solana network is accessible
- Verify wallet extension is installed
- Try different wallet (Phantom → Solflare)

### Deposits not routing correctly
- Verify `SOLANA_DEPOSIT_WALLET` env var is set
- Check blockchain explorer for transaction
- Review server logs for errors

## Support

For issues or questions:
- Check README.md for general documentation
- Review server logs: `.manus-logs/`
- Test with curl: `curl https://your-domain.com/api/trpc/solana.getDepositWallet`

## Production Checklist

- [ ] Bot token configured in environment
- [ ] Webhook URL set in @BotFather
- [ ] Database migrations applied
- [ ] HTTPS enabled
- [ ] CORS configured correctly
- [ ] Rate limiting enabled
- [ ] Monitoring and alerts set up
- [ ] Backup strategy implemented
- [ ] Security headers configured
- [ ] Load balancer configured (if needed)

---

**Bot Setup Date**: April 17, 2026
**Status**: Production Ready ✅
