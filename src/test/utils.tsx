import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';

export function renderWithProviders(ui: ReactElement) {
  return render(ui);
}

export async function clickElement(element: HTMLElement) {
  await userEvent.click(element);
}

export async function typeInElement(element: HTMLElement, text: string) {
  await userEvent.type(element, text);
}