import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: flex-end;
  padding: 26px;
  background: #e5556e;

  img {
    margin-right: 30px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex: 1;
  justify-content: space-between;
  height: 16px;

  ul {
    display: flex;
    list-style: none;
    align-items: center;
    list-style: none;

    &:last-child {
      li {
        margin-right: 0;
      }
    }
  }

  li {
    margin-right: 30px;
  }

  a {
    color: rgba(255, 255, 255, 0.7);
    font-size: 16px;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover,
    &.active {
      color: #fff;

      .profileIcon {
        border-color: #fff;
      }
    }

    .profileIcon {
      border-radius: 50%;
      border: 1px solid transparent;
      padding: 4px;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: #fff;
      }
    }
  }
`;
