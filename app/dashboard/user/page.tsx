import { readUsers } from "@/lib/actions/user";
<<<<<<< HEAD
=======
import { cn } from "@/lib/utils";
>>>>>>> b24a877 (updated: user)
import Image from "next/image";
import React from "react";

export default async function page() {
<<<<<<< HEAD
	const { data: users } = await readUsers();
=======
	const { data } = await readUsers();
>>>>>>> b24a877 (updated: user)

	return (
		<div className="rounded-md bg-graident-dark border-[0.5px] overflow-y-scroll ">
			<div className="w-[900px] md:w-full">
				<div className="grid grid-cols-3 border-b p-5 dark:text-gray-500">
					<h1>Name</h1>
					<h1>Role</h1>
					<h1>Email</h1>
				</div>
				<div className="space-y-10 p-5">
<<<<<<< HEAD
					{users?.map((user, index) => {
=======
					{data?.map((user, index) => {
>>>>>>> b24a877 (updated: user)
						return (
							<div
								className="grid grid-cols-3 grid-flow-dense"
								key={index}
							>
								<div className="flex items-center gap-2 font-medium">
									<Image
										src={user.image_url}
										className="rounded-full ring-green-500 ring-1"
										width={50}
										height={50}
										alt={user.display_name}
									/>
									<h1>{user.display_name}</h1>
								</div>

								<div className="flex items-center">
									<h1>{user.role}</h1>
								</div>

								<div className="flex items-center">
									<h1>{user.email}</h1>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
