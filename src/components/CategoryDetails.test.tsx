import { act } from "@testing-library/react-hooks";
import { render, unmountComponentAtNode } from "react-dom";
import { CategoryDetails } from "./CategoryDetails";
import { useSelector } from "react-redux";
import { InitialState } from "../store/initialState";
import { catogories, catogoryApis } from "../services/MockData";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useStateSelecto: jest.fn(),
  useDispatch: jest.fn(),
}));
const mockState: InitialState = {
  categories: catogories,
  categoriesApiData: catogoryApis,
};

describe("tanPanel", () => {
  let container: any = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("renders with child elements", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(mockState);
    });

    act(() => {
      render(<CategoryDetails />, container);
    });

    expect(container.querySelector(`[data-testid="item-tab"]`)).not.toBeNull();
  });
});
