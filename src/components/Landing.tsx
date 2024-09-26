// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { ChefHat, Utensils, Users, DollarSign } from "lucide-react"
// import Link from "next/link"

// export default function ModernLandingPage() {
//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-b from-orange-50 to-white">
//       <header className="px-4 lg:px-6 h-16 flex items-center backdrop-blur-sm bg-white/30 sticky top-0 z-50">
//         <Link className="flex items-center justify-center" href="#">
//           <BiriyaniLogo className="h-8 w-8" />
//           <span className="ml-2 text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
//             BuyMeABiriyani
//           </span>
//         </Link>
//         <nav className="ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
//             Features
//           </Link>
//           <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
//             Pricing
//           </Link>
//           <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
//             About
//           </Link>
//           <Link className="text-sm font-medium hover:text-orange-500 transition-colors" href="#">
//             Contact
//           </Link>
//         </nav>
//       </header>
//       <main className="flex-1">
//         <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
//                   Spice Up Your Support with
//                   <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
//                     BuyMeABiriyani
//                   </span>
//                 </h1>
//                 <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
//                   Show your appreciation for content creators by treating them to a virtual plate of biriyani. It's like buying them a coffee, but with more flavor!
//                 </p>
//               </div>
//               <div className="space-x-4">
//                 <Button className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:opacity-90 transition-opacity">
//                   Get Started
//                 </Button>
//                 <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-50">
//                   Learn More
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">How It Works</h2>
//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
//               <div className="flex flex-col items-center text-center group">
//                 <div className="mb-4 p-4 bg-orange-100 rounded-full transition-colors group-hover:bg-orange-200">
//                   <ChefHat className="h-8 w-8 text-orange-500" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Create Your Page</h3>
//                 <p className="text-gray-500">Set up your BuyMeABiriyani page and share your culinary journey with your audience.</p>
//               </div>
//               <div className="flex flex-col items-center text-center group">
//                 <div className="mb-4 p-4 bg-orange-100 rounded-full transition-colors group-hover:bg-orange-200">
//                   <Users className="h-8 w-8 text-orange-500" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Share With Fans</h3>
//                 <p className="text-gray-500">Let your supporters know they can show appreciation with a virtual plate of biriyani.</p>
//               </div>
//               <div className="flex flex-col items-center text-center group">
//                 <div className="mb-4 p-4 bg-orange-100 rounded-full transition-colors group-hover:bg-orange-200">
//                   <DollarSign className="h-8 w-8 text-orange-500" />
//                 </div>
//                 <h3 className="text-xl font-bold mb-2">Receive Support</h3>
//                 <p className="text-gray-500">Get financial support and feel the warmth of your community's appreciation!</p>
//               </div>
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-orange-50 to-white">
//           <div className="container px-4 md:px-6">
//             <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Featured Creators</h2>
//             <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-12">
//               {[1, 2, 3].map((i) => (
//                 <div key={i} className="flex flex-col items-center text-center bg-white p-6 rounded-lg shadow-lg transition-transform hover:scale-105">
//                   <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mb-4">
//                     <ChefHat className="h-12 w-12 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-2">Chef Spice Master {i}</h3>
//                   <p className="text-gray-500 mb-4">Sharing amazing South Indian recipes and food stories.</p>
//                   <Button className="bg-gradient-to-r from-orange-500 to-red-600 text-white hover:opacity-90 transition-opacity">
//                     Buy a Biriyani
//                   </Button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//         <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-orange-500 to-red-600 text-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center space-y-4 text-center">
//               <div className="space-y-2">
//                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                   Ready to Spice Up Your Support?
//                 </h2>
//                 <p className="mx-auto max-w-[600px] text-orange-100 md:text-xl">
//                   Join BuyMeABiriyani today and start receiving support in the form of delicious virtual biriyani!
//                 </p>
//               </div>
//               <div className="w-full max-w-sm space-y-2">
//                 <form className="flex space-x-2">
//                   <Input 
//                     className="max-w-lg flex-1 bg-white/10 text-white placeholder-white/70 border-white/20 focus:border-white"
//                     placeholder="Enter your email"
//                     type="email"
//                   />
//                   <Button className="bg-white text-orange-500 hover:bg-orange-100 transition-colors" type="submit">
//                     Sign Up
//                   </Button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>
//       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
//         <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 BuyMeABiriyani. All rights reserved.</p>
//         <nav className="sm:ml-auto flex gap-4 sm:gap-6">
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Terms of Service
//           </Link>
//           <Link className="text-xs hover:underline underline-offset-4" href="#">
//             Privacy
//           </Link>
//         </nav>
//       </footer>
//     </div>
//   )
// }

// const BiriyaniLogo = ({ className }: { className?: string }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//   >
//     <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
//     <path d="M12 22v-5" />
//     <path d="M8 12v5" />
//     <path d="M16 12v5" />
//   </svg>
// )