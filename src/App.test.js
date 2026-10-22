import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing hero and download call to action', () => {
  render(<App />);

  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
    /student loans/i
  );

  const downloadLinks = screen.getAllByRole('link', {
    name: /download apk/i
  });

  expect(downloadLinks.length).toBeGreaterThan(0);
  downloadLinks.forEach((link) => {
    expect(link).toHaveAttribute('href', expect.stringContaining('app.apk'));
  });
});
