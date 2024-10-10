import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ButtonLink } from './ButtonLink'
import { PathsRoutes } from '../../router/types'

describe('ButtonLink', () => {
  test('renders correctly with given props', () => {
    const testRoute: PathsRoutes = PathsRoutes.Forum
    const buttonText = 'Click Me'

    render(
      <MemoryRouter>
        <ButtonLink to={testRoute}>{buttonText}</ButtonLink>
      </MemoryRouter>
    )

    expect(screen.getByText(buttonText)).toBeInTheDocument()

    expect(screen.getByRole('link', { name: buttonText })).toHaveAttribute(
      'href',
      testRoute
    )
  })
})
