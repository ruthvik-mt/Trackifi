// // src/components/LoadingSpinner.tsx
// const LoadingSpinner = () => {
//   return (
//     <div className="flex justify-center items-center h-32">
//       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
//     </div>
//   );
// };

// export default LoadingSpinner;

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-6">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
