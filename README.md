# Wizeline Academy - Ondemand React Bootcamp

## Test for Final Deliverable

**Requirement 1** ESLint rules are applied correctly

**Requirement 2**

- 2.1: src/components/banner/BannerApi.test.js
- 2.2: src/components/carousel/CarouselApi.test.js
- 2.3: src/components/products/ProducstApiGrid.test.js

**Requirement 3** src/components/productFilter/ProductFilterApi.test.js

**Requirement 4** src/components/productDetail/productDetail.test.js

**Requirement 5** src/components/search/SearchTest.test.js

**Requirement 6** src/components/cart/CartPageTest.test.js

## Final Deliverable

### Requirements

The following is the list of requirements for your deliverable:

1. Please make sure that **ESLint rules** are applied to your code without
   errors or warnings. If you want to know more about setting up **ESLint and
   Prettier** in your “Create React App” project take a look at
   [this article](https://www.mkapica.com/react-eslint/) and
   [this documentation link](https://create-react-app.dev/docs/setting-up-your-editor/#experimental-extending-the-eslint-config).

2. Add automated tests for the following scenarios in **Home Page**:

- 2.1. Featured Banners Slider is fetching and rendering data from the API
- 2.2. Categories Carousel/Grid is fetching and rendering data from the API
- 2.3. Featured Products Grid is fetching and rendering data from the API

3. Add automated tests for the following scenarios in **Product List Page**:

- 3.1. Product Category Sidebar is fetching and rendering data from the API
- 3.2. Category links on Product Category Sidebar are filtering Products Grid
  correctly interacting with the API
- 3.3. Pagination Controls are generated correctly based on the number of
  results fetched from the API and the maximum number of products per page
- 3.4. Prev button is disabled when the user is on the first page
- 3.5. Next button is working as expected
- 3.6. Prev button is working as expected
- 3.7. Next button is disabled when the user is on the last page

4. Add automated tests for the following scenarios in **Product Detail Page**:

- 4.1. Product Detail Page is fetching and rendering data from the API for a
  particular product.
- 4.2. Product Detail Page contains the following labels: name of the selected
  product, current price, SKU, category name, a list of tags, and description.
- 4.3. Product Detail Page contains a quantity selector and an “Add to Cart”
  button.
- 4.4. Validate that after clicking on the “Add to Cart” button, the number of
  items that are selected in quantity selector control are added to the cart.
- 4.5. Validate that the “Add to Cart” button is disabled when the stock units
  available for the selected product is zero.

5. Add automated tests for the following scenarios in **Search Results Page**:

- 5.1. Validate that the list of results is rendering data according to the
  “searchTerm” provided.
- 5.2. Validate that an empty state is displayed when there are no results for
  the “searchTerm” provided.

6. Add automated tests for the following scenarios in **Shopping Cart Page**:

- 6.1. Validate that an empty state is displayed when there are no items in the
  cart.
- 6.2. Validate that the list of products is shown when there are items in the
  cart. Each row should contain the main image of the product, its name, unit
  price, a quantity selector, subtotal and a “remove from cart icon”.
- 6.3. Validate that the cart total label displays the sum of the subtotals of
  all items in the cart.
- 6.4. Validate that you can update the quantity of items for a particular
  product in the cart. Don’t forget to validate that you don’t exceed the stock
  units available for the selected product.
- 6.5. Validate that you can remove a product from the cart after clicking on
  the “remove from cart icon”.

> **IMPORTANT:** Don’t consume the real APIs on the tests, instead, you can use
> the [MSW (Mock Service Worker) library](https://mswjs.io/) and please take a
> look at [this article](https://kentcdodds.com/blog/stop-mocking-fetch)

> **Notes**:
>
> - You must use Jest and React Testing Library for the tests
> - Please avoid using snapshot tests
> - Make sure that you are applying the best practices for testing behavior and
>   not detailed implementations as the React Testing Library docs suggest
> - Make sure to run your tests continuously and validate that all the test
>   scenarios are passing successfully

### Evaluation Criteria

The following is the list of evaluation criteria for your deliverable:

- Test cases for **Home Page** (5 points)
- Test cases for **Product List Page** (20 points)
- Test cases for **Product Detail Page** (25 points)
- Test cases for **Search Results Page** (10 points)
- Test cases for **Shopping Cart Page** (40 points)
