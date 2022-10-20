import { w, W } from '../src';
import { expectType } from 'tsd';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('styled', () => {
  const defaultClassName = 'xyz';

  describe('when using a tag', () => {
    const variants = {
      color: {
        gray: 'x',
        red: 'y',
      },
      size: {
        sm: 'z',
        xl: 'q',
      },
    } as const;
    const Button = w.button(defaultClassName, {
      variants,
      defaultVariants: {
        size: 'sm',
      },
    });

    it('should render without errors', () => {
      render(<Button color="gray" />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    describe('if setting defaultProps', () => {
      it('should forward it to the component', () => {
        const RawButton = w.button(defaultClassName, {
          variants,
          defaultVariants: {
            size: 'sm',
          },
          defaultProps: {
            'aria-label': 'Teste',
          },
        });

        render(<RawButton color="gray" />);
        expect(screen.getByLabelText('Teste')).toBeInTheDocument();
      });
    });

    describe('if no classnames are evaluated', () => {
      const RawButton = w.button('');

      it('should render without errors', () => {
        render(<RawButton />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).not.toHaveAttribute('class');
      });
    });

    describe('if setting mapVariants', () => {
      const RawButton = w.button(defaultClassName, {
        variants: {
          textColor: {
            primary: 'text-primary-500',
            secondary: 'text-secondary-500',
          },
          fontSize: {
            base: 'text-base',
            xl: 'text-xl',
          },
          color: {
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
          },
        },
        mapVariants: {
          color: {
            primary: {
              textColor: 'primary',
            },
            secondary: {
              textColor: 'secondary',
            },
          },
        },
        defaultVariants: {
          color: 'primary',
          textColor: 'primary',
          fontSize: 'base',
        },
        transient: ['textColor'],
      });

      const assertClassNames = (expectedClassNames: string[]) => {
        expect(
          screen
            .getByRole('button')
            .className.split(' ')
            .sort()
        ).toEqual(expectedClassNames.sort());
      };

      it('should render with right className', () => {
        render(<RawButton color="primary" />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        assertClassNames([
          defaultClassName,
          'text-base',
          'bg-primary-500',
          'text-primary-500',
        ]);
      });

      describe('if changing the mapped variant', () => {
        it('should render with correct className', () => {
          render(<RawButton color="secondary" />);
          assertClassNames([
            defaultClassName,
            'text-base',
            'bg-secondary-500',
            'text-secondary-500',
          ]);
        });
      });

      describe('if setting the mapped variant with a custom value for the mapped variant', () => {
        it('should render with correct className', () => {
          render(<RawButton color="secondary" textColor="primary" />);
          assertClassNames([
            defaultClassName,
            'text-base',
            'bg-secondary-500',
            'text-primary-500',
          ]);
        });
      });
    });

    describe('if not declaring variants', () => {
      const RawButton = w.button(defaultClassName);

      it('should render without errors', () => {
        render(<RawButton />);
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveAttribute(
          'class',
          defaultClassName
        );
      });
    });

    describe.each([
      [
        'color=gray',
        { color: 'gray' },
        [defaultClassName, variants.color.gray, variants.size.sm],
      ],
      [
        'color=gray size=sm',
        { color: 'gray', size: 'sm' },
        [defaultClassName, variants.color.gray, variants.size.sm],
      ],
      [
        'color=gray size=undefined',
        { color: 'gray', size: undefined },
        [defaultClassName, variants.color.gray, variants.size.sm],
      ],
      [
        'color=red size=xl',
        { color: 'red', size: 'xl' },
        [defaultClassName, variants.color.red, variants.size.xl],
      ],
    ])('if rendering with props %s', (_, props, expectedClassNames) => {
      it('should pass the evaluated className prop', () => {
        render(<Button {...(props as any)} />);
        const element = screen.getByRole('button');
        expect(element.className.split(' ').sort()).toEqual(
          expectedClassNames.sort()
        );
      });
    });

    it('should set correct prop types inferred by variants', () => {
      expectType<W.Infer<typeof Button>>(
        {} as { color: 'gray' | 'red'; size?: 'sm' | 'xl' }
      );
    });

    it('should make variants required by default', () => {
      expectType<true>(
        {} as Pick<W.Infer<typeof Button>, 'color'> extends { color: string }
          ? true
          : false
      );
    });

    it('should make variants with default value optional', () => {
      expectType<Pick<W.Infer<typeof Button>, 'size'>>(
        {} as { size?: 'sm' | 'xl' }
      );
    });

    it('should accept tag props', () => {
      type Props = W.Infer<typeof Button>;
      expectType<true>(
        {} as Props['onClick'] extends
          | React.MouseEventHandler<HTMLButtonElement>
          | undefined
          ? true
          : false
      );
    });

    it("should be a W.Component<'button'>", () => {
      expectType<
        W.Component<
          'button',
          {
            color: {
              gray: string;
              red: string;
            };
            size: {
              sm: string;
              xl: string;
            };
          },
          {}
        >
      >(Button);
    });
  });

  describe('when using custom component', () => {
    interface PostProps {
      className?: string;
      post: { id: string };
      isActive: string;
      ariaLabel?: string;
    }

    const mockPost = { id: '1' };
    const Post: React.FC<PostProps> = ({ className, ariaLabel }) => (
      <article className={className} aria-label={ariaLabel}>
        Post
      </article>
    );
    const variants = {
      isActive: (yes: boolean) => (yes ? 'yes' : 'no'),
      color: {
        gray: 'x',
        red: 'y',
      },
    } as const;
    const Custom = w(Post, {
      className: defaultClassName,
      variants,
      defaultVariants: {
        isActive: false,
      },
    });

    it('should render without errors', () => {
      render(<Custom post={mockPost} color="gray" />);
      expect(screen.getByRole('article')).toBeInTheDocument();
    });

    describe('if setting defaultProps', () => {
      const CustomWithDefaultProps = w(Post, {
        className: defaultClassName,
        variants,
        defaultVariants: {
          isActive: false,
        },
        defaultProps: {
          ariaLabel: 'Teste',
        },
      });

      it('should forward it to the component', () => {
        render(<CustomWithDefaultProps post={mockPost} color="gray" />);
        expect(screen.getByLabelText('Teste')).toBeInTheDocument();
      });

      it('should not make prop types optional', () => {
        expectType<true>(
          {} as Pick<W.Infer<typeof CustomWithDefaultProps>, 'post'> extends {
            post: { id: string };
          }
            ? true
            : false
        );
      });
    });

    describe('if setting transient variants', () => {
      const CustomWithTransientVariants = w(
        props => {
          if (props.isActive) {
            throw new Error('isActive should not be passed to the component');
          }

          return (
            <article className={props.className}>
              worked {props.post.id}
            </article>
          );
        },
        {
          variants: { isActive: { a: 'b' } },
          defaultVariants: {
            isActive: 'a',
          },
          transient: ['isActive'],
        }
      );

      it('should not pass it to the component', () => {
        render(<CustomWithTransientVariants post={{ id: '1' }} isActive="a" />);
        const article = screen.getByRole('article');
        expect(article).toHaveTextContent('worked 1');
        expect(article.className).toEqual('b');
      });
    });

    describe.each([
      [
        'color=gray',
        { color: 'gray' },
        [defaultClassName, variants.color.gray, variants.isActive(false)],
      ],
      [
        'color=gray isActive=true',
        { color: 'gray', isActive: true },
        [defaultClassName, variants.color.gray, variants.isActive(true)],
      ],
      [
        'color=red isActive=false',
        { color: 'red', isActive: false },
        [defaultClassName, variants.color.red, variants.isActive(false)],
      ],
    ])('if rendering with props %s', (_, props, expectedClassNames) => {
      it('should pass the evaluated className prop', () => {
        render(<Custom post={mockPost} {...(props as any)} />);
        const element = screen.getByRole('article');
        expect(element.className.split(' ').sort()).toEqual(
          expectedClassNames.sort()
        );
      });
    });

    it('should set correct prop types inferred by variants and component props', () => {
      expectType<W.Infer<typeof Custom>>(
        {} as {
          color: 'gray' | 'red';
          isActive?: boolean;
          post: { id: string };
        }
      );
    });

    it('should make variants required by default', () => {
      expectType<true>(
        {} as Pick<W.Infer<typeof Custom>, 'color'> extends { color: string }
          ? true
          : false
      );
    });

    it('should make variants with default value optional', () => {
      expectType<Pick<W.Infer<typeof Custom>, 'isActive'>>(
        {} as { isActive?: boolean }
      );
    });

    it('should keep custom component props', () => {
      type Props = W.Infer<typeof Custom>;
      expectType<true>(
        {} as Props['post'] extends { id: string } ? true : false
      );
    });

    it('should override component props if name match', () => {
      type Props = W.Infer<typeof Custom>;
      expectType<true>(
        {} as Props['isActive'] extends boolean | undefined ? true : false
      );
    });

    it("should be a W.Component<'button'>", () => {
      expectType<
        W.Component<
          'button',
          {
            color: {
              gray: string;
              red: string;
            };
            size: {
              sm: string;
              xl: string;
            };
          },
          {}
        >
      >(Custom);
    });
  });
});
