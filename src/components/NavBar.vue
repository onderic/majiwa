<template>
   <div class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4">
      <nav class="max-w-[85rem] w-full mx-auto px-4 flex flex-wrap basis-full items-center justify-between" aria-label="Global">
        <a class="sm:order-1 flex-none text-xl font-semibold" href="/">Brand</a>
        <div class="sm:order-3 flex items-center gap-x-2">
          <button type="button" class="sm:hidden hs-collapse-toggle p-2.5 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-alignment" aria-controls="navbar-alignment" aria-label="Toggle navigation">
            <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" x2="21" y1="6" y2="6"/>
              <line x1="3" x2="21" y1="12" y2="12"/>
              <line x1="3" x2="21" y1="18" y2="18"/>
            </svg>
            <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
          <!-- <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            Login
          </button> -->
        </div>
        <div id="navbar-alignment" class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto sm:block sm:order-2">
          <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
            <a class="font-medium text-blue-500" href="/" aria-current="page">Home</a>
            <!-- <a class="font-medium text-gray-600 hover:text-gray-400" href="#">Resources</a> -->
            <a class="font-medium text-gray-600 hover:text-gray-400" href="#">About</a>
            <a class="font-medium text-gray-600 hover:text-gray-400" href="#">Contact</a>
           <router-link to="/login"> <a class="flex justify-end items-end bg-blue-500 text-white py-1 px-3 rounded-md">Login</a></router-link>
          </div>
        
        </div>
      </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>