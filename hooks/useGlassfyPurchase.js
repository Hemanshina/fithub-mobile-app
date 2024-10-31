import { useState } from 'react';
import { GlassfySku, Glassfy } from 'react-native-glassfy-module';

const useGlassfyPurchase = () => {
  const [transaction, setTransaction] = useState(null);

  const purchase = async (sku) => {
    try {
      const purchasedTransaction = await Glassfy.purchaseSku(sku);

      if (purchasedTransaction.receiptValidated) {
        setTransaction(purchasedTransaction);
        // You can handle the successful transaction here or provide a callback function
        handleSuccessfulTransactionResult(purchasedTransaction, sku);
      }
    } catch (error) {
      // Handle purchase error if needed
      console.error('Purchase failed:', error);
    }
  };

  return { transaction, purchase };
};

// Helper function to handle a successful transaction
const handleSuccessfulTransactionResult = (transaction, sku) => {
  // Implement your logic for handling a successful transaction result
  console.log('Transaction successful:', transaction, sku);
};

export default useGlassfyPurchase;
