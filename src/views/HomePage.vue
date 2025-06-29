<script setup>
import { ref } from 'vue';

const hasDecks = ref(true);
</script>

<template>
    <div v-if="!hasDecks" class="flex px-40 py-5 w-full">
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
    <div v-else class="px-40 flex flex-1 justify-center py-5">
          <div class="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div class="flex flex-wrap justify-between gap-3 p-4"><p class="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">Meus Decks</p></div>
            <div class="px-4 py-3">
              <label class="flex flex-col min-w-40 h-12 w-full">
                <div class="flex w-full flex-1 items-stretch rounded-xl h-full">
                  <div
                    class="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0"
                    data-icon="MagnifyingGlass"
                    data-size="24px"
                    data-weight="regular"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    placeholder="Busque seus decks"
                    class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    value=""
                  />
                </div>
              </label>
            </div>
            <h3 class="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Recentemente estudados</h3>
            <div class="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&amp;::-webkit-scrollbar]:hidden">
              <div class="flex items-stretch p-4 gap-3">
                <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC_taw55CRADeJ9XApLg-d0X9D-BzYucoZXmvIeybg0W-t_kvxzvbXZ8GaU5FZ9SmXkKtiUtJ7cCW3vy6e72gIkEqyhJbX8O1H7hfcwybspeFEhlWhv0DDrp8pwRHSsW3LTwJ-E-NSXYDY_4TZYTwH5IcR8_b8O-Mvz-wuC-G0HuiyAQQD1asIXPWGH1dhoz9WVGYXe43wXFsEHLAR5qJVzolsJI-FEoZwaLhqTsm5XnOtjlRApnqGJhCEXS1DTTNHD_IiQa086YUZd");'
                  ></div>
                  <div>
                    <p class="text-[#121416] text-base font-medium leading-normal">Biology 101</p>
                    <p class="text-[#6a7681] text-sm font-normal leading-normal">20 cards</p>
                  </div>
                </div>
                <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBF7cvuquTwuuu4OSqF9yIBKvQ5hTF4H7B2EtGQOdvTqZ_0qi4aCnpo7yjL8MjcVggl-4nOuV0GgvJRMmQqVRhcln5bW2pfbxmTckh16ADubCTJOFhvMOKPZsuf9xPSqK3T2hJWlZKl3toZPIiXDoF63Aa0NBO9m2qzVo7eqIBHzazP_AKsvhReJIi7QGLD_kHVmeHW4lJtujRYBNmqu4HrKL9Ei82ZQYeqEeOJaOy3F3tkJdAGDvN8fU5rboNb4Sv0t2NG4LAP_sqP");'
                  ></div>
                  <div>
                    <p class="text-[#121416] text-base font-medium leading-normal">World History</p>
                    <p class="text-[#6a7681] text-sm font-normal leading-normal">30 cards</p>
                  </div>
                </div>
                <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                  <div
                    class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl flex flex-col"
                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzE3cGQO7SK98QYhHb8b3ndbqI_nVwe_lgqzKmuTpvrT2wYzJhZxH144SpGZ9peDT48FTbpFq-4sJVX0NVdM_XxDZqfesVOvhoACmUvIkIkHj3E_KCydl-iX2ovfzjg49_3BR0kXlcQEqOO5ieNK5VhW8FzkjvoojD99uFCfKgVP9aTEEcSsaRFajS_qjsTkCfzb7499AdSrScc3Mm4Ct1D0G-oeybwOrchj8sa4MGAzllhl4GtVG_eFTNNNiLraft2H4nCjORw1j-");'
                  ></div>
                  <div>
                    <p class="text-[#121416] text-base font-medium leading-normal">Calculus</p>
                    <p class="text-[#6a7681] text-sm font-normal leading-normal">25 cards</p>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="text-[#121416] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Todos os Decks</h3>
            <div class="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCkDjUEKinuBfnJPGie1flDiCHVATZLPE7m4-zsFkTm7jFukLlQ5l0kX-CfU3ll55uJtaCECoInM3e2q2OuCpqEyjyeBzX5Pw12h1P5S4DcW-O9nhX2hL9qt1dFgrLMcAw5TYgjmof-ipudzJuiODgKQyknV3YxAgZIBVasJy-Oo5cMy024kXYY4WENfNzUOp4brkswP6uahYKzQ6mWNTAcoaY2mjbBcBKwpHvKew4IkGtQy7rlbVFgURPbcXMQmniZ09ARZlphPQIW");'
                ></div>
                <div>
                  <p class="text-[#121416] text-base font-medium leading-normal">Biology 101</p>
                  <p class="text-[#6a7681] text-sm font-normal leading-normal">20 cards</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDq7IdUEFIZ1BTJjhj9A2hGIH5owN-Rp1AWLoDS2r29_E3V7QMoeonKRgXhl_Erd_9apL1lIlTqF8APGTTpVfPBGx3GJn8xT5Ti56Dy7rYviT_haqFVeI1BJpVOoUssxKTUu5qkIE_zd_iyTVjRrVskwnawVNMfDsHHwMyroA2uLb2KvrQp_Yfx-apRvSyRfPKz1GJK4PU89euZhzpw3treYet-Z41R1rPYF31ohXLvZ4h2Kx06ZE2zhX5v0wEl6XJddPAAzohp2V9Q");'
                ></div>
                <div>
                  <p class="text-[#121416] text-base font-medium leading-normal">World History</p>
                  <p class="text-[#6a7681] text-sm font-normal leading-normal">30 cards</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaJN_kMYJZnDMu6RSTm9KMoJmZYDTqYEi6TWkpYs7Ax3PhKT-FiSzkk488swK2xaE5ZOEDm0mWDvft85f7-Hcwt92qgUEh5bPeN8RYJ5H7uKdgqKOZpEouWRSM7NrHqBu6RwAJDPUyOQCn5ECFnPITzM32nImp87XY0--N7bZAsMeBe0cXMHCZQlTwarLCo7r2gEW_C9cmil59xn-enY-7Vwnzp1t-5RSHpWbCpqppv8y-ZKibEGl45ggaBunVQCFuoXwOvIDDZNfr");'
                ></div>
                <div>
                  <p class="text-[#121416] text-base font-medium leading-normal">Calculus</p>
                  <p class="text-[#6a7681] text-sm font-normal leading-normal">25 cards</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBk3SfDqIQsfGp65u6SlxNuJwfhwDU3N7VsCKzhYl34kY9SPa-64ZGwoiAMtG_3-VblAy787Afv7j4iJw4dgPF6KdjONPPuANfXwF3MxICl7DzFuniNo3vnnd74XXJ04C9BYx18VdMPPaBbZejMxtk1os5IinmOfOrKeZ6Mtk4-CxwpkcK4u1XBMjWNWlLGGzLwyj49h9EKQI2Xg3tlxg4oDP6Cp_IPzd9m1kuQSXgtu4dyn0X7j2zCgaNMU8nJqF6T-FxEhc7aDxln");'
                ></div>
                <div>
                  <p class="text-[#121416] text-base font-medium leading-normal">Spanish Vocabulary</p>
                  <p class="text-[#6a7681] text-sm font-normal leading-normal">40 cards</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCmp23KrJUEhCcXjUXgdXMpFopY9Wq9T7lYASciyuVUv8Q-ezO_0MEuNJ7fwKd93o0pM_0OP_LyCXDsHe3IDasMTI_DVMk5pvvGqSntJpQIaf1tu6Sv6eM8pnXt9QRkCPl_BzgJq67GBIrD0OcoGxvyjmMm5mgfvllHthGorOJKe9KXSFG8id7WsktAgiAfkbc4MVmXh8cjTRrRIyjCLREJtzLmylla8i62rTZSSD_DZ9abwxfGG1Nu9hLEsy474lB6x4yxVHdTN218");'
                ></div>
                <div>
                  <p class="text-[#121416] text-base font-medium leading-normal">Organic Chemistry</p>
                  <p class="text-[#6a7681] text-sm font-normal leading-normal">35 cards</p>
                </div>
              </div>
              <div class="flex flex-col gap-3 pb-3">
                <div
                  class="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAeF_0Rdsxf4OQLsKgfrsm0q3fQPwDxf6-gd1JnoadNcK93LEpZGi-0Q2AvJoD3rMfpSVgES-Q6uFgZUw1I2lxy6PQZcY_hA2coM_gwF-fpp7DJbeGc9XplEwuLH3XIeBnGfL5u2A4Ko6Ra_44aZrFKami5TSIVXcgk85OAONCkQIQdIqL8oayPdM21eAyKfieeIJx91JBj1SDK7pzqQIaEao4yYRDyaFtskjd5v_T9v5YRlk1yr4gD7VLYizzzK1BY6KlpmYxDh4hW");'
                ></div>
                <div>
                  <p class="text-[#121416] text-base font-medium leading-normal">American Literature</p>
                  <p class="text-[#6a7681] text-sm font-normal leading-normal">50 cards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
</template>