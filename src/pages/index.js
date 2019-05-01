import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import styled from "styled-components"

import { Layout, Article, Wrapper, Button, SectionTitle } from "../components"

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 3rem 6rem;
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    padding: 3rem 2rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1.5rem;
  }
  overflow: hidden;
`

const Hero = styled.div`
  grid-column: 2;
  padding: 3rem 2rem 6rem 2rem;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  color: ${props => props.theme.colors.grey.dark};

  @media (max-width: ${props => props.theme.breakpoints.phone}) {
    padding: 2rem 1rem 4rem 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-top: 1rem;
    @media (max-width: ${props => props.theme.breakpoints.tablet}) {
      font-size: 1.1rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }
`

const IndexPage = ({
  data: {
    allMdx: { edges: postEdges }
  }
}) => (
  <Layout>
    <Wrapper>
      <Hero>
        <h1>Isomorphic Graph Architecture</h1>
        <p>
          Future software will be more intelligent, dynamic, and complex than
          what our traditional database and API technologies can support.
          Isomorphic Graph Architecture is a software stack built around the
          mathematical graph structure. It combines the power of Graph Databases
          and the versatility of GraphQL to enable next generation software to
          unlock the rich information hidden in our interconnected data.
        </p>
      </Hero>
      <Content>
        <SectionTitle>Graph Technology Resources</SectionTitle>
        {postEdges.map(post => (
          <Article
            title={post.node.frontmatter.title}
            date={post.node.frontmatter.date}
            excerpt={post.node.excerpt}
            timeToRead={post.node.timeToRead}
            slug={post.node.fields.slug}
            categories={post.node.frontmatter.categories}
            key={post.node.fields.slug}
          />
        ))}
      </Content>
    </Wrapper>
  </Layout>
)

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired
    })
  }).isRequired
}

export const IndexQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MM/DD/YYYY")
            categories
          }
          excerpt(pruneLength: 200)
          timeToRead
        }
      }
    }
  }
`
