export const ContactMaps = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
      {/* Hanoi Office Map */}
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1862.2525816022508!2d105.84630880452299!3d21.01246388824938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab004a31f4ab%3A0xd46ae1c785fa3c93!2zTGnDqm4gY8ahIHF1YW4gVsOibiBI4buT!5e0!3m2!1svi!2s!4v1773681260925!5m2!1svi!2s"
            width="100%"
            height="100%"
            style={{ border: "none", display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Hanoi Office Location"
          />
        </div>
        <div className="p-4 bg-gray-50">
          <h3 className="font-bold text-gray-800 mb-2">Văn phòng Hà Nội</h3>
          <p className="text-sm text-gray-600">
            Nhà Số 10, Ngõ 243/44, Tổ 8 Ngọc Thuỵ, Phường Bồ Đề, TP Hà Nội, Việt Nam
          </p>
        </div>
      </div>

      {/* Ho Chi Minh Office Map */}
      {/* <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <div className="aspect-video bg-gray-200 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.3821484375!2d106.7569!3d10.8009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dac1234567!2z26%20%C4%90.%20S%E1%BB%91%205%2C%20khu%20V%E1%BA%A1n%20Ph%C3%BAc%201!5e0!3m2!1svi!2s!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: "none", display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ho Chi Minh City Office Location"
          />
        </div>
        <div className="p-4 bg-gray-50">
          <h3 className="font-bold text-gray-800 mb-2">Văn phòng TP. Hồ Chí Minh</h3>
          <p className="text-sm text-gray-600">
            26 Đ. Số 5, khu Vạn Phúc 1, P.Hiệp Bình, TP. Hồ Chí Minh
          </p>
        </div>
      </div> */}
    </div>
  );
};
