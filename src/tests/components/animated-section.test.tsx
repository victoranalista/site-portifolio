import { render } from "@testing-library/react";
import { AnimatedSection } from "@/components/animated-section";

jest.mock("react-intersection-observer", () => ({
  useInView: () => [null, true],
}));

describe("AnimatedSection", () => {
  it("renders children properly", () => {
    const { getByText } = render(
      <AnimatedSection>
        <div>Test Content</div>
      </AnimatedSection>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <AnimatedSection className="custom-class">
        <div>Test Content</div>
      </AnimatedSection>
    );

    expect(container.firstChild as HTMLElement).toHaveClass("custom-class");
  });
});
