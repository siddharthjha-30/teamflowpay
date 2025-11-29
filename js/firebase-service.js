class FirebaseService {
  constructor() {
    this.db = null;
    this.initialized = false;
    this.unsubscribe = null;
    this.onTransactionUpdate = null;
  }
  async init() {
    if (this.initialized) return;
    try {
      if (typeof firebase === "undefined") {
        console.error("❌ Firebase SDK not loaded");
        return false;
      }
      const firebaseConfig = {
        apiKey: "AIzaSyBm99LuoWkf0BYVxy7fumptxXF_RiwL44w",
        authDomain: "flowpay-c5dc6.firebaseapp.com",
        projectId: "flowpay-c5dc6",
        storageBucket: "flowpay-c5dc6.firebasestorage.app",
        messagingSenderId: "901105128726",
        appId: "1:901105128726:web:c230a8f575cfeaf8adec37",
        measurementId: "G-DGF2FTH7YJ",
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      this.db = firebase.firestore();
      this.initialized = true;
      return true;
    } catch (error) {
      console.error("❌ Firebase initialization error:", error);
      return false;
    }
  }
  async saveTransaction(walletAddress, transaction) {
    if (!this.initialized) {
      return false;
    }
    try {
      const docId = transaction.hash;
      await this.db
        .collection("wallets")
        .doc(walletAddress.toLowerCase())
        .collection("transactions")
        .doc(docId)
        .set(
          {
            ...transaction,
            syncedAt: firebase.firestore.FieldValue.serverTimestamp(),
            walletAddress: walletAddress.toLowerCase(),
          },
          { merge: true }
        );
      return true;
    } catch (error) {
      console.error("❌ Error saving to Firebase:", error);
      return false;
    }
  }
  async getTransactions(walletAddress) {
    if (!this.initialized) {
      return [];
    }
    try {
      const snapshot = await this.db
        .collection("wallets")
        .doc(walletAddress.toLowerCase())
        .collection("transactions")
        .orderBy("date", "desc")
        .get();
      const transactions = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        transactions.push({
          hash: doc.id,
          type: data.type,
          address: data.address,
          amount: data.amount,
          currency: data.currency,
          status: data.status,
          date: data.date,
          blockNumber: data.blockNumber,
          gasUsed: data.gasUsed,
          fee: data.fee,
        });
      });
      return transactions;
    } catch (error) {
      console.error("❌ Error fetching from Firebase:", error);
      return [];
    }
  }
  async syncLocalToFirebase(walletAddress) {
    const localTxs = localStorage.getItem("transactions");
    if (!localTxs) {
      return;
    }
    try {
      const transactions = JSON.parse(localTxs);
      let syncedCount = 0;
      for (const tx of transactions) {
        const success = await this.saveTransaction(walletAddress, tx);
        if (success) syncedCount++;
      }
    } catch (error) {
      console.error("❌ Error syncing to Firebase:", error);
    }
  }
  async loadAndMergeTransactions(walletAddress) {
    try {
      const firebaseTxs = await this.getTransactions(walletAddress);
      const localTxs = JSON.parse(localStorage.getItem("transactions") || "[]");
      const allTxs = [...firebaseTxs];
      const existingHashes = new Set(firebaseTxs.map((tx) => tx.hash));
      localTxs.forEach((tx) => {
        if (!existingHashes.has(tx.hash)) {
          allTxs.push(tx);
        }
      });
      allTxs.sort((a, b) => new Date(b.date) - new Date(a.date));
      localStorage.setItem("transactions", JSON.stringify(allTxs));
      return allTxs;
    } catch (error) {
      console.error("❌ Error merging transactions:", error);
      return JSON.parse(localStorage.getItem("transactions") || "[]");
    }
  }
  subscribeToTransactions(walletAddress, callback) {
    if (!this.initialized) {
      return null;
    }
    try {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.unsubscribe = this.db
        .collection("wallets")
        .doc(walletAddress.toLowerCase())
        .collection("transactions")
        .orderBy("date", "desc")
        .onSnapshot(
          (snapshot) => {
            const transactions = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              transactions.push({
                hash: doc.id,
                type: data.type,
                address: data.address,
                amount: data.amount,
                currency: data.currency,
                status: data.status,
                date: data.date,
                blockNumber: data.blockNumber,
                gasUsed: data.gasUsed,
                fee: data.fee,
              });
            });
            localStorage.setItem("transactions", JSON.stringify(transactions));
            if (callback && typeof callback === "function") {
              callback(transactions);
            }
          },
          (error) => {
            console.error("❌ Real-time listener error:", error);
          }
        );
      return this.unsubscribe;
    } catch (error) {
      console.error("❌ Error setting up real-time listener:", error);
      return null;
    }
  }
  unsubscribeFromTransactions() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }
  async autoBackupLocalStorage(walletAddress) {
    const backupKey = `firebase_backup_done_${walletAddress.toLowerCase()}`;
    const alreadyBackedUp = localStorage.getItem(backupKey);
    if (alreadyBackedUp === "true") {
      return;
    }
    const localTxs = localStorage.getItem("transactions");
    if (!localTxs) {
      localStorage.setItem(backupKey, "true");
      return;
    }
    try {
      const transactions = JSON.parse(localTxs);
      if (transactions.length === 0) {
        localStorage.setItem(backupKey, "true");
        return;
      }
      let backedUpCount = 0;
      for (const tx of transactions) {
        const success = await this.saveTransaction(walletAddress, tx);
        if (success) backedUpCount++;
      }
      localStorage.setItem(backupKey, "true");
    } catch (error) {
      console.error("❌ Error during auto-backup:", error);
    }
  }
}

const firebaseService = new FirebaseService();

window.firebaseService = firebaseService;
