/* eslint-disable react/prop-types */
import { DialogContainer } from './Layout';
import styled from '@emotion/styled';

const PageLayout = ({ header, children, aside, footer }) => {
  const Wrapper = styled.div`
    padding: 0 60px;
    display: flex;
    gap: 40px;
    background-color: #f7f7f7;
    flex: 1;
    overflow: auto; // To handle overflow content
    justifycontent: center;
    alignitems: center;
  `;
  const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; // Full viewport height
  `;

  const Header = styled.header`
    flex-shrink: 0; // Prevents the header from shrinking
  `;

  const Main = styled.main`
    flex: 3; // Main content takes most of the space
  `;

  const Aside = styled.aside`
    flex: 1; // Aside takes less space
  `;

  const Footer = styled.footer`
    flex-shrink: 0; // Prevents the footer from shrinking
  `;

  return (
    <Container>
      <Header>{header}</Header>
      <Wrapper>
        <Main>{children}</Main>
        <Aside>{aside}</Aside>
      </Wrapper>
      <Footer>{footer}</Footer>
      <DialogContainer />
    </Container>
  );
};

export default PageLayout;
