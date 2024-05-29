import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Form from "./Form";
import { updateList } from "../Views/Inventory";


function submit(product) {
    console.log("Name:", product.name);
    console.log("Quantity:", product.quantity);
    console.log("Price:", product.price);
}


describe("Add product form", () => {
    it("should render the form fields", () => {
      render(<Form text="Add to inventory" handleSubmit={submit}/>);
      expect(screen.getByLabelText("product")).toBeInTheDocument();
      expect(screen.getByLabelText("quantity")).toBeInTheDocument();
      expect(screen.getByLabelText("price")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Add to inventory" })).toBeInTheDocument();
    });
  
    it("should call the submit function with the form values", async () => {
      const user = userEvent.setup();
      render(<Form/>);
  
      const productInput = screen.getByLabelText("product");
      const quantityInput = screen.getByLabelText("quantity");
      const priceInput = screen.getByLabelText("price");
      const submitButton = screen.getByRole("button");
  
      await user.type(productInput, "product1");
      expect(productInput).toHaveValue("product1");
      await user.type(quantityInput, "1");
      expect(quantityInput).toHaveValue("1");
      await user.type(priceInput, "10");
      expect(priceInput).toHaveValue("10");
      await user.click(submitButton);
  
      expect(submit).toHaveBeenCalledWith({
        product: "product1",
        quantity: "1",
        price: "10",
      });
    });
  });