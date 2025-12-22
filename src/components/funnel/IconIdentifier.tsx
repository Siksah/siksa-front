
// Import all SVGs to identify them
import img1 from '@/assets/images/result/result_food_15.svg';
import img2 from '@/assets/images/result/result_food_2.svg';
import img3 from '@/assets/images/result/result_food_4.svg';
import img4 from '@/assets/images/result/result_food_11.svg';
import img5 from '@/assets/images/result/result_food_14.svg';
import img6 from '@/assets/images/result/result_food_7.svg';

export const IconIdentifier = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-100">
      <div className="border p-2">
        <p>1. a670 (1.7MB)</p>
        <img src={img1} className="w-full h-auto" />
      </div>
      <div className="border p-2">
        <p>2. 598e (708KB)</p>
        <img src={img2} className="w-full h-auto" />
      </div>
      <div className="border p-2">
        <p>3. 4c85 (570KB)</p>
        <img src={img3} className="w-full h-auto" />
      </div>
      <div className="border p-2">
        <p>4. 65d4 (481KB)</p>
        <img src={img4} className="w-full h-auto" />
      </div>
      <div className="border p-2">
        <p>5. 9915 (409KB)</p>
        <img src={img5} className="w-full h-auto" />
      </div>
      <div className="border p-2">
        <p>6. bf15 (409KB)</p>
        <img src={img6} className="w-full h-auto" />
      </div>
    </div>
  );
};
