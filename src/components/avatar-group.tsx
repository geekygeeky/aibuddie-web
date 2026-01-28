"use client";

const avatars = [
    "https://github.com/geekygeeky.png",
    "https://i.pravatar.cc/100?img=60",
    "https://github.com/devwraithe.png",
    "https://i.pravatar.cc/100?img=48",
    "https://i.pravatar.cc/100?img=10",
    "https://i.pravatar.cc/100?img=7",
];

const AvatarGroup = () => {
    return (
        <section className="flex flex-wrap items-center justify-center gap-4 mt-4 mb-8">
            {/* Avatar group */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-3 ">
                <div className="flex items-center -space-x-3">
                    {avatars.map((src, i) => (
                        <img
                            key={i}
                            src={src}
                            alt={`User ${i + 1}`}
                            className="w-10 h-10 rounded-full border-2 border-white object-cover hover:scale-110 transition-transform duration-200"
                        />
                    ))}
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-white bg-linear-to-r from-green-500 to-green-light-1 text-white text-xs font-semibold">
                        +999
                    </div>

                </div>

                <p className="text-sm md:text-base text-gray-900 dark:text-gray-100 font-semibold">
                    <span className="pr-1">More people supercharge their productivity on</span>
                    <span className="text-green-light-2">AiBuddie</span>.
                </p>

            </div>

            {/* Text content */}
            <div>

                <p className="text-gray-500 dark:text-gray-400 text-s">
                    Join a growing community using AI to improve personal brand and delivery.
                </p>
            </div>
        </section>
    );
};

export default AvatarGroup;