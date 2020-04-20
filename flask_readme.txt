1. python app.py
2. curl -F "file=@./SampleImages/xyz.xyz" http://localhost:8000/home #source Image
3. curl -F "file=@./SampleImages/123.123" http://localhost:8000/home # Reference Image
4. curl  http://localhost:8000/result
5. Output image saved as "out.jpg" 