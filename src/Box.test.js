import { render, screen } from '@testing-library/react';
import Box from './Box';

it('renders without crashing', () => {
  render(<Box />);
});

it('matches snapshot', () => {
  const {asFragment} = render(<Box color="blue" height="100" width="200" />)
  expect(asFragment()).toMatchSnapshot()
});