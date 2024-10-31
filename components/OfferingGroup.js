import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Glassfy,
  GlassfyOffering,
  GlassfyPermission,
  GlassfySku,
  GlassfyTransaction,
  GLASSFY_LOGLEVEL,
} from "react-native-glassfy-module";

import PropTypes from "prop-types";
import useGlassfyPurchase from "../hooks/useGlassfyPurchase";

const OfferingGroup = ({ group }) => {
  const { transaction, purchase } = useGlassfyPurchase();

  const shouldPurchase = (sku) => {
    console.log("clicked me", sku);
    purchase(sku);
  };

  // Format the price of a product
  const numberFormat = (product) =>
    new Intl.NumberFormat("en-EN", {
      style: "currency",
      currency: product.currencyCode,
    }).format(product.price);

  return (
    <View style={styles.offeringContainer}>
      <Text style={styles.offering}>{group.offeringId}</Text>

      <View style={styles.skuContainer}>
        {group?.skus?.map((sku) => (
          <TouchableOpacity
            key={sku.skuId}
            onPress={() => shouldPurchase(sku)}
            style={styles.skuButton}
          >
            <View style={styles.skuText}>
              <Text>{sku.product.title}</Text>
              <Text style={styles.skuDesc}>{sku.product.description}</Text>
            </View>
            <View style={styles.skuPrice}>
              <Text>{numberFormat(sku.product)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

OfferingGroup.propTypes = {
  group: PropTypes.shape({
    offeringId: PropTypes.string.isRequired,
    skus: PropTypes.arrayOf(
      PropTypes.shape({
        skuId: PropTypes.string.isRequired,
        product: PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          currencyCode: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  offeringContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    marginVertical: 4,
  },
  skuButton: {
    padding: 12,
    borderRadius: 4,
    margin: 4,
    flexDirection: "col",
    width: "100%",
  },
  offering: {
    padding: 10,
    fontWeight: "700",
    width: "100%",
    fontSize: 20,
  },
  skuContainer: {
    marginVertical: 6,
    justifyContent: "center",
  },
  skuText: {
    flexGrow: 1,
  },
  skuDesc: {
    color: "#B6B7C0",
    paddingVertical: 4,
  },
  skuPrice: {
    justifyContent: "end",
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginVertical: 2,
    borderColor: "#4000A4",
    width: "60%",
  },
});

export default OfferingGroup;
