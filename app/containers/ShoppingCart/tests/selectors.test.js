const { selectGrandTotal, selectProductListTotal } = require('../selectors');

describe('shoppingCart selectors', () => {
  const product1 = {
    id: 'p-6005',
    thumbnail: null,
    title: 'Sculpture of whatever it is',
    price: '99.99€',
    quantity: 2,
    maxQuantity: 4,
  };
  const product2 = {
    id: 'p-6057',
    thumbnail: null,
    title: 'Statue of the three graces',
    price: '156.06€',
    quantity: 1,
    maxQuantity: 3,
  };
  const promoCodePercentage = {
    code: 'TEST',
    description: 'test promo percentage',
    discountPercentage: 0.22,
    discountPrice: null,
  };
  // const promoCodePriceDKK = {
  //   code: 'TEST',
  //   description: 'test promo price',
  //   discountPercentage: null,
  //   discountPrice: '100DKK',
  // };
  // const promoCodePriceEUR = {
  //   code: 'TEST',
  //   description: 'test promo price',
  //   discountPercentage: null,
  //   discountPrice: '100€',
  // };
  const shippingMethodFree = {
    id: 'free',
    title: 'free shipping method',
    description: '3 to 5 shipping day',
    price: null,
  };
  // const shippingMethodDKK = {
  //   id: 'free',
  //   title: 'free shipping method',
  //   description: '3 to 5 shipping day',
  //   price: '100DKK',
  // };
  // const shippingMethodEUR = {
  //   id: 'free',
  //   title: 'free shipping method',
  //   description: '3 to 5 shipping day',
  //   price: '100€',
  // };

  describe('selectProductListTotal', () => {
    it('should compute the subtotal', () => {
      const shoppingCartState = {
        productList: {
          [product1.id]: product1,
          [product2.id]: product2,
        },
        promoCode: promoCodePercentage,
        VAT: 0.25,
        shippingMethod: shippingMethodFree,
        paymentMethod: null,
      };
      const mockedState = {
        shoppingCart: shoppingCartState,
      };
      expect(selectProductListTotal(mockedState)).toEqual(['256.05€']);
    });
  });

  describe('selectGrandTotal', () => {
    it('Should compute the grand total', () => {
      const shoppingCartState = {
        productList: {
          [product1.id]: product1,
          [product2.id]: product2,
        },
        promoCode: null,
        VAT: 0.25,
        shippingMethod: shippingMethodFree,
        paymentMethod: null,
      };
      const mockedState = {
        shoppingCart: shoppingCartState,
      };
      expect(selectGrandTotal(mockedState)).toEqual(['320.0625€']);
    });
    it('Should work also without any shippingMethod selected', () => {
      const shoppingCartState = {
        productList: {
          [product1.id]: product1,
          [product2.id]: product2,
        },
        promoCode: null,
        VAT: 0.25,
        shippingMethod: null,
        paymentMethod: null,
      };
      const mockedState = {
        shoppingCart: shoppingCartState,
      };
      expect(selectGrandTotal(mockedState)).toEqual(['320.0625€']);
    });
  });
});
