import React from 'react';
import { render } from '@testing-library/react';
import GenerateTree from "./ResultView";

test('renders learn react link', () => {
  const { getByText } = render(<GenerateTree />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
