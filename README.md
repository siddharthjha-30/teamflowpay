# FlowPay - Cross-Border Crypto Payment Platform

![FlowPay](https://img.shields.io/badge/FlowPay-Polygon-8247E5?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-MVP-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Fast, Smart, Global Payments** - A modern fintech web application built on the Polygon blockchain for seamless cross-border cryptocurrency payments.

## 🚀 Features

### 🔐 Authentication

- **Google OAuth Login** - Real Google OAuth 2.0 integration with Google Identity Services
- **MetaMask Integration** - Connect your crypto wallet directly
- Secure session management
- JWT token handling for Google authentication
- Demo mode fallback when OAuth not configured

### 📊 Dashboard

- **Wallet Overview** - View your wallet address and MATIC balance
- **Real-time Balance** - Live balance updates with USD conversion
- **Recent Transactions** - Quick access to your latest 5 transactions
- **AI Insights** - Smart recommendations including:
  - Best time to send payments (gas fee optimization)
  - Rate predictions for MATIC
  - Network status monitoring

### 💸 Send Money

- **Multi-Currency Support** - Send in MATIC, USD, EUR, or INR
- **Real-time Conversion** - Instant currency conversion display
- **Gas Fee Estimation** - Transparent fee calculation
- **Recent Recipients** - Quick access to frequently used addresses
- **Transaction Confirmation** - Detailed success modal with transaction hash
- **PolygonScan Integration** - Direct links to view transactions on blockchain explorer

### 📥 Receive Money

- **QR Code Generation** - Instant QR code for your wallet address
- **Payment Links** - Shareable payment request links
- **Amount Specification** - Optional amount requests
- **Social Sharing** - Share via WhatsApp, Telegram, or Email
- **Incoming Payment Tracking** - Monitor pending and completed payments

### 📜 Transaction History

- **Complete Transaction List** - View all your payment history
- **Advanced Filters** - Filter by:
  - Transaction type (Sent/Received)
  - Status (Success/Pending/Failed)
  - Time range (Today/Week/Month/Year)
  - Search by address or hash
- **Pagination** - Easy navigation through transaction pages
- **Export Options** - Export to CSV or PDF
- **Mobile Responsive** - Optimized card view for mobile devices

## 🛠️ Tech Stack

- **Frontend**: HTML5, TailwindCSS, Vanilla JavaScript
- **Blockchain**: Polygon (MATIC)
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Inter)
- **CDN**: TailwindCSS CDN for rapid development

## 📁 Project Structure

```
flow/
├── index.html              # Login/Landing page
├── dashboard.html          # Main dashboard
├── send.html              # Send money page
├── receive.html           # Receive money page
├── history.html           # Transaction history
├── js/
│   ├── config.js         # Configuration (Google OAuth, API keys)
│   ├── auth.js           # Authentication logic
│   ├── dashboard.js      # Dashboard functionality
│   ├── send.js           # Send transaction logic
│   ├── receive.js        # Receive payment logic
│   └── history.js        # Transaction history & filters
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- MetaMask extension (optional, for wallet connection)
- Local web server or Live Server extension for VS Code
- Google Cloud account (for Google OAuth setup)

### Installation

1. **Clone or Download** the project to your local machine

2. **Configure Google OAuth** (Required for production, optional for demo):

   - See [GOOGLE_OAUTH_SETUP.md](GOOGLE_OAUTH_SETUP.md) for detailed instructions
   - Create a Google Cloud project
   - Get your OAuth Client ID
   - Update `js/config.js` with your Client ID
   - **Note**: App works in demo mode without configuration

3. **Open with a local server**:

   **Option A: Using VS Code Live Server**

   - Install "Live Server" extension in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"

   **Option B: Using Python**

   ```bash
   # Python 3
   python -m http.server 8000

   # Then visit http://localhost:8000
   ```

   **Option C: Using Node.js**

   ```bash
   npx serve
   ```

4. **Access the application**:
   - Navigate to the local server URL (e.g., `http://localhost:8000`)
   - You'll see the FlowPay login page

### Demo Usage

1. **Login**:
   - Click "Continue with Google" or "Connect MetaMask Wallet"
   - Demo mode works without actual MetaMask installation
2. **Explore Dashboard**:
   - View mock wallet balance and transactions
   - Check AI insights and recommendations
3. **Send Payment**:
   - Enter a receiver address (or use mock: `0x8ba1f109551bD432803012645Ac136ddd64DBA72`)
   - Enter amount and select currency
   - Click "Send Payment"
   - View transaction confirmation
4. **Receive Payment**:
   - View your wallet QR code
   - Generate payment links
   - Share via social platforms
5. **Transaction History**:
   - Browse all transactions
   - Apply filters and search
   - Export data

## 🎨 Design Features

### UI/UX Highlights

- ✨ Clean, minimalist design
- 🎨 Purple gradient brand colors (#667eea to #764ba2)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌈 Smooth transitions and hover effects
- 🎯 Intuitive navigation
- 💡 Clear visual hierarchy
- ⚡ Fast loading with CDN resources

### Accessibility

- Semantic HTML5
- Clear contrast ratios
- Keyboard navigation support
- Readable font sizes
- Descriptive labels and placeholders

## 🔧 Configuration

### Mock Data

The application uses mock data for demonstration. To integrate with real blockchain:

1. **Update wallet connection** in `js/auth.js`:

   - Implement actual MetaMask connection
   - Handle network switching to Polygon

2. **Add blockchain interaction** in `js/send.js`:

   - Integrate Web3.js or Ethers.js
   - Implement actual transaction sending
   - Add gas estimation logic

3. **Fetch real data** in `js/dashboard.js` and `js/history.js`:
   - Connect to Polygon RPC
   - Fetch real balance and transactions
   - Use Polygon APIs for transaction history

### Exchange Rates

Update exchange rates in `js/send.js`:

```javascript
const exchangeRates = {
  MATIC: 1,
  USD: 0.68,
  EUR: 0.62,
  INR: 56.5,
};
```

## 🌐 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

## 📝 Features Roadmap

### Phase 1 (Current - MVP)

- ✅ User authentication
- ✅ Wallet dashboard
- ✅ Send/Receive payments
- ✅ Transaction history
- ✅ Basic UI/UX

### Phase 2 (Planned)

- 🔲 Real MetaMask integration
- 🔲 Actual blockchain transactions
- 🔲 Multi-wallet support
- 🔲 Real-time exchange rates API
- 🔲 Gas fee optimization

### Phase 3 (Future)

- 🔲 Multi-chain support (Ethereum, BSC, etc.)
- 🔲 DeFi integration
- 🔲 NFT support
- 🔲 Advanced analytics
- 🔲 Mobile app (React Native)

## 🤝 Contributing

This is a hackathon MVP project. Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

Built with ❤️ for hackathon demonstration

## 📧 Contact

For questions or feedback, please open an issue in the repository.

## 🙏 Acknowledgments

- **Polygon** - For the blockchain infrastructure
- **TailwindCSS** - For the utility-first CSS framework
- **Font Awesome** - For the beautiful icons
- **Google Fonts** - For the Inter font family

---

**Note**: This is a demo/MVP application with mock data. For production use, implement proper blockchain integration, security measures, and real-time data fetching.

## 🎯 Hackathon Highlights

- ⚡ **Rapid Development** - Built with modern web technologies
- 🎨 **Professional Design** - Clean, minimalist UI suitable for fintech
- 📱 **Responsive** - Works seamlessly on all devices
- 🚀 **Production-Ready UI** - Just needs blockchain backend integration
- 💡 **Innovative Features** - AI insights for optimal transaction timing
- 🌍 **Global Focus** - Multi-currency support for cross-border payments

Perfect for demonstrating fintech concepts and blockchain payment flows! 🎉
