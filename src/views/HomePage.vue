<template>
    <div class="flex px-40 py-5 w-full">
        <div class="layout-content-container flex flex-col flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4">
                <p class="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">Bem vindo de volta,
                    Lucas</p>
            </div>
            <div class="flex-1 flex-col items-center px-4 py-6 w-full">
                <div class="flex flex-col items-center gap-6">
                    <div class="bg-center bg-no-repeat aspect-video bg-cover rounded-xl w-full max-w-[360px]"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCDJRa6PP-ubp76-UMc-wuQOqs4UYfdzLasm7RnisrIZkfJSyrOYDx36dp9luhSFr0407H2G7yZ-AoWat4za-b-qAE_b0Psw1Dm5LuGcdd8J72vCT1jiqIJRoajQN-Na3WjErE1P5BhOdyWpt0FStQ-_1m8E3WHQxKAamFUPF3wi97uF-6ZcRtmn1NaFzi6Uj00KXXH9NMGXBWL8B2hmv4dsMHp1Afp6PHq9W3I_WlIAGCH4RToVGCr_qdqPzxdWAQXfZKbHK5E5Yk-");'>
                    </div>
                    <div class="flex max-w-[480px] flex-col items-center gap-2">
                        <p
                            class="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">
                            Nenhum deck criado ainda</p>
                        <p class="text-[#121416] text-sm font-normal leading-normal max-w-[480px] text-center">Crie seu primeiro deck para começar a estudar</p>
                    </div>
                    <button
                        class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#f1f2f4] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
                        <span class="truncate">Criar deck</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>