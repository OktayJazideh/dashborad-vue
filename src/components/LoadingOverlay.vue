<template>
    <div class="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div class="loader"></div>
    </div>
  </template>
  
  <style scoped>
  .loader {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #2563eb;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>