<div class="flex items-center justify-center h-full">
  <div class="flex flex-col gap-2 w-[min(100%,600px)]">
    <h2 class="text-3xl font-bold text-neutral-content">000</h2>
    <div class="flex flex-row gap-2">
      <input type="text" placeholder="Question" class="input input-bordered w-full" />
      <label class="flex flex-col items-center text-neutral-content text-sm">
        Math
        <input type="checkbox" class="toggle" />
      </label>
    </div>
    <div>
      <textarea
        class="block textarea textarea-bordered resize-none w-full h-28"
        placeholder="Response"
      ></textarea>
    </div>
    <div class="join w-full">
      <button class="btn btn-sm join-item flex-1">A</button>
      <button class="btn btn-sm join-item flex-1">B</button>
      <button class="btn btn-sm join-item flex-1">C</button>
      <button class="btn btn-sm join-item flex-1">D</button>
      <button class="btn btn-sm join-item flex-1">E</button>
    </div>
    <button class="btn rounded-full">Submit</button>
  </div>
</div>
