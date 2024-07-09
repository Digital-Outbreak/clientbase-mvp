import OwnerHeader from '@/components/owners/OwnerHeader'
import React from 'react'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className='relative min-h-screen'>
      <OwnerHeader />
      <main className='pt-3'>{children}</main>
    </div>
  )
}

export default RootLayout
