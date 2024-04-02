Link deploy:
https://admin-nodejs03-d94a9.web.app/
tk: admin@gmail.com
mk: 123123123

tài khoản của tư vấn viên:(sẽ chỉ dùng được với chức năng chat)
tk: counselors@gmail.com
mk: 123123123

https://client-nodejs03-a429d.web.app/
tk: client@gmail.com
mk: 123123123

Link mongodbcompass
mongodb+srv://thangfx21518:R7iLSQw82qUFqdkk@cluster0.fdehoqk.mongodb.net/
-Khi vào lần đầu tiên hãy đợi chút để server on Render khởi động
-Khi nhắn tin lần đầu load vào trang nếu nhắn mấy tin mà không được hãy chat /end để xóa room(tin nhắn đầu tiên sẽ bị miss vì để set room mới từ tin nhắn thứ 2 sẽ hoạt động bình thường)
-	Ở đây em sẽ nộp 2 bản:
	-	Bản chạy với session sẽ chỉ chạy được trên localhost vì khi deploy lên render và firebase nó sẽ bị lỗi không share được session khi cả 3 port nằm ở 3 nơi nên bị lỗi còn ở localhost thì sẽ chạy bình thường
	-	Bản chạy với jwt sẽ ổn định hơn và không bị lỗi session do dữ liệu được lưu vào token lưu ở client và được dùng để deploy 
	-	2 bản tính năng như nhau nhưng những sản phẩm được thêm bởi 2 bản tuy sẽ hiển thị được bình thường khi thêm mới nhưng khi xóa hoặc update sẽ bị lỗi vì 2 folder image là khác nhau nên khi unlink sẽ bi lỗi

-Nếu có bất kì lỗi nào hãy thử f5 lại trang và trang sẽ hoạt động bình thường
