import React from "react";

export default function Footer() {
  return (
   <footer className="bg-[#0f0f0f] text-gray-400 py-16 px-6">
     
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div>
            <h4 className="text-white mb-4">Product</h4>
            <p>Live Sports</p>
            <p>Highlights</p>
            <p>Subscriptions</p>
          </div>

          <div>
            <h4 className="text-white mb-4">Company</h4>
            <p>About</p>
            <p>Blogs</p>
            <p>Partners</p>
          </div>

          <div>
            <h4 className="text-white mb-4">Support</h4>
            <p>Help Center</p>
            <p>Contact</p>
            <p>Privacy</p>
          </div>

          <div>
            <h4 className="text-white mb-4">Entertainment</h4>
            <p>© 2026 All rights reserved</p>
          </div>
        </div>
      </footer>
  );
}
