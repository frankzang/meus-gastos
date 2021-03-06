import React from "react";
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from "./UI/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./Routes";
import { Home } from "./Views/Home";
import { ProductsProvider } from "./State/Products";
import { CreateProduct } from "./Views/CreateProduct";
import { ProductPage } from "./Views/Product";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ColorModeProvider>
        <ProductsProvider>
          <BrowserRouter>
            <Switch>
              <Route exact path={Routes.HOME} component={Home} />
              <Route path={Routes.CREATE_PRODUCT} component={CreateProduct} />
              <Route
                path={`${Routes.PRODUCT}/:productId`}
                component={ProductPage}
              />
            </Switch>
          </BrowserRouter>
        </ProductsProvider>
      </ColorModeProvider>
    </ThemeProvider>
  );
};

export default App;
