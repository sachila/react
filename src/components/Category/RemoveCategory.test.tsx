import { act } from "@testing-library/react-hooks";
import { render, unmountComponentAtNode } from "react-dom";
import { useSelector } from "react-redux";
import { catogories, catogoryApis } from "../../services/MockData";
import { InitialState } from "../../store/initialState";
import RemoveCategory from "./RemoveCategory";

const mockState: InitialState = {
  categories: catogories,
  categoriesApiData: catogoryApis,
};

const mockState2: InitialState = {
  categories: [],
  categoriesApiData: catogoryApis,
};

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("RemoveCategory", () => {
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

  it("renders with removed items", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(mockState);
    });

    act(() => {
      render(<RemoveCategory />, container);
    });

    expect(
      container.querySelector(`[data-testid="deleted-items-found"]`)
    ).not.toBeNull();
    expect(
      container.querySelector(`[data-testid="deleted-items-not-found"]`)
    ).toBeNull();
  });

  it("renders with no removed items", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(mockState2);
    });

    act(() => {
      render(<RemoveCategory />, container);
    });

    expect(
      container.querySelector(`[data-testid="deleted-items-not-found"]`)
    ).not.toBeNull();
    expect(
      container.querySelector(`[data-testid="deleted-items-found"]`)
    ).toBeNull();
  });
});
