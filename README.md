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
# Usage

## xin chào các bạn

### xin chào các bạn

#### xin chào các bạn

##### xin chào các bạn

###### xin chào các bạn

## Font

bôi đậm sẽ dùng 2 dấu _ trước và sau chữ: **đậm**
in nghiêng sẽ dùng 1 dấu _ tước hoặc sau chữ: \_nghiêng\_ _nghiêng_
cả đậm và nghiêng **_all_**
gạch bỏ dùng 2 dấu ~ trc và sau: ~~delete~~
để giữ lại các kí tự đặc biệt thì dùng \* \_ thì dùng \*\*Ví dụ\*\*

## Quotation

> npm install

dùng dấu \` để `nhấn mạnh` chữ trong câu

## Tạo bảng

Bảng có thể được tạo bằng cách đánh như sau:
Canh lề cho bảng bằng dấu :
|Stt|Cột 1|Cột 2|
|:---|:------:|-------:|
|1|Đây là ô 1|Đây là ô 2|

Có thể tạo bảng nhanh nhờ extension:
| 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 |

## Code block

```javascript
console.log("hello world");
```

có thể tạo code block bằng tab đầu dòng
console.log

## Gạch ngang

---

---

## chèn link

Chèn link bằng dấu ngoặc vuông và tròn như sau:
[Phạm Thắng](https://www.facebook.com/profile.php?id=100012066912528)
Có thể format cho link luôn
<**https://www.facebook.com/profile.php?id=100012066912528**>

## Chèn hình ảnh

![alt text](z5305630368321_5ab90acbe5f3147f397cc821552f9a5f.jpg)
hoặc dùng thẻ để chỉnh kích thước
<img src="z5305630368321_5ab90acbe5f3147f397cc821552f9a5f.jpg" width="300">

## Vẽ biểu đồ

dùng mermaid: [mermaid](https://www.facebook.com/profile.php?id=100012066912528)

## import file

dùng @import "/index.html"

## Math

để viết công thức toán cần đặt giữa 2 dấu \$
$\alpha$

- số ở trên dưới
  - $x^2$
  - $x_1$
  - $H_2SO_4$
  - $C_n^2$
  - Mũi tên: $\to$
  - Vô cùng $\infty$
  - Phân số: $\frac{1}{2}$
  - Căn bậc 2: $\sqrt[n]{2}$

---
