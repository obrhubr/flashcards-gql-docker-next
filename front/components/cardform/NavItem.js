import { useState } from 'react';

export default function NavItem({ href, action, children }) {
    return (
		<li>
			<a
				href={href}
				className={`block px-4 py-2 rounded-md bg-yellow-100 text-amber-700`}
			>
				{children}
			</a>
		</li>
    )
}