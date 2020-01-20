import React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from "./UI/theme";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "./Routes";
import { Home } from "./Views/Home";
import { ProductsProvider } from "./Context/Products";
import { Configurations } from "./Views/Configurations";
import { CreateProduct } from "./Views/CreateProduct";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ProductsProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={Routes.HOME} component={Home} />
            <Route path={Routes.CREATE_PRODUCT} component={CreateProduct} />
            <Route path={Routes.CONFIGURATIONS} component={Configurations} />
          </Switch>
        </BrowserRouter>
      </ProductsProvider>
    </ThemeProvider>
  );
};

export default App;
