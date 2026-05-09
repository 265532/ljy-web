FROM python:3.10-slim

WORKDIR /app

RUN pip install --upgrade pip

COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY static ./static
COPY backend/ .

EXPOSE 8010

ENV PYTHONUNBUFFERED=1
ENV PORT=8010

CMD ["python", "main.py"]