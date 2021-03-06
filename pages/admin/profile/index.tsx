import type { GetServerSideProps, GetServerSidePropsContext } from 'next'
import requireServerAuth from 'middleware/requireServerAuth'
import MainLayout from 'components/layouts/mainLayout'
import DocStyleLayout from 'components/layouts/docStyleLayout'
import { Container } from '@chakra-ui/react'
import RouteNames from 'constants/routeNames'
import { profileMenu } from './data/menu'

export default function Profile() {
  return (
    <MainLayout
      title="User Settings"
      breadcrumbs={[{ name: 'profile', url: '/admin/profile' }]}
    >
      <DocStyleLayout menus={profileMenu}>
        <Container maxW="container.xl"></Container>
      </DocStyleLayout>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const user = await requireServerAuth(context.req)

  if (!user) {
    return {
      redirect: {
        destination: RouteNames.LOGIN,
        permanent: false,
      },
    }
  }

  return {
    props: { user: user || null },
  }
}
