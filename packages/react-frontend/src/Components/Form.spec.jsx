import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Remove destructuring
import Form from "./Form";
import Inventory from "../Views/Inventory";

jest.mock("../Views/Inventory", () => ({
    updateList: jest.fn(),
}));

describe("Add product form", () => {
    it("should render the form fields", () => {
      render(<Form text="Add to inventory"/>);
      expect(screen.getByLabelText("product")).toBeInTheDocument();
      expect(screen.getByLabelText("quantity")).toBeInTheDocument();
      expect(screen.getByLabelText("price")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Add to inventory" })).toBeInTheDocument();
    });
  
    it("should call the updateList function with the form values", async () => {
      const user = userEvent.setup();
      render(<Form text="Add to inventory" handleSubmit={Inventory.updateList}/>);
      const productInput = screen.getByLabelText("product");
      const quantityInput = screen.getByLabelText("quantity");
      const priceInput = screen.getByLabelText("price");
      const submitButton = screen.getByRole("button", { name: "Add to inventory" });

      await user.type(productInput, "product1");
      expect(productInput).toHaveValue("product1");
      await user.type(quantityInput, "1");
      expect(quantityInput).toHaveValue("1");
      await user.type(priceInput, "10");
      expect(priceInput).toHaveValue("10");
      await user.click(submitButton);
  
      expect(Inventory.updateList).toHaveBeenCalledWith({
        product: "product1",
        quantity: "1",
        price: "10",
      });
    });
});
