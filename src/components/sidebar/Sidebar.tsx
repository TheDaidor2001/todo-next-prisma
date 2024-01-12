import Image from "next/image"
import Link from "next/link"
import { CiLogout } from "react-icons/ci"
import { LogOutBtn, SidebarItem } from ".."
import { IoBasketOutline, IoCalendarOutline, IoCheckboxOutline, IoCodeWorkingOutline, IoListOutline, IoPersonOutline } from 'react-icons/io5'
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const menuItem = [
    {
        icon: <IoCalendarOutline />,
        title: 'Dashboard',
        path: '/dashboard'
    },
    {
        icon: <IoCheckboxOutline />,
        title: 'Rest TODOS',
        path: '/dashboard/rest-todos'
    },
    {
        icon: <IoListOutline />,
        title: 'Server Actions',
        path: '/dashboard/server-todo'
    },
    {
        icon: <IoCodeWorkingOutline />,
        title: 'Cookies',
        path: '/dashboard/cookies'
    },
    {
        icon: <IoBasketOutline />,
        title: 'Productos',
        path: '/dashboard/products'
    },
    {
        icon: <IoPersonOutline />,
        title: 'Perfil',
        path: '/dashboard/profile'
    },
]

export const Sidebar = async () => {

    const session = await getServerSession(authOptions)

    const userName = session?.user?.name ?? 'No name'
    const avatarUrl = (session?.user?.image)
        ? session.user.image
        : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fphotos%2Favatar.html&psig=AOvVaw20nBEtd3MG1DmQOQhV57Aw&ust=1705136326188000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNitiP2914MDFQAAAAAdAAAAABAE'
    const userRol = session?.user?.roles ?? ['clients']

    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>
                <div className="-mx-6 px-6 py-4">
                    {/* TODO: Next/Link hacia dashboard */}
                    <Link href="#" title="home">
                        <Image
                            src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" className="w-32" alt="tailus logo" width={150} height={150} />
                    </Link>
                </div>

                <div className="mt-8 text-center">
                    <Image src={avatarUrl} alt="" className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" width={150} height={150} />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{userName}</h5>
                    <span className="hidden text-gray-400 lg:block capitalize">{userRol.join(',')}</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    {menuItem.map((item, index) => (
                        <SidebarItem key={item.path} {...item} />
                    ))}
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <LogOutBtn />
            </div>
        </aside>
    )
}
