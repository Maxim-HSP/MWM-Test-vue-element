::��ת����ĿĿ¼
cd %cd% 

::����mongodb���˴�����mongodb�����ݿ�·����
start/min cmd /c "mongod --dbpath mongodb"

::����mongodb�������ü�����ip�Ͷ˿ڣ���Ӧ�ں�̨�����õ����ݿ����Ӷ˿ڣ�
start/min cmd /c mongo 127.0.0.1:27017

::������Ŀ����Ŀ�������������������
node app.js

:: ˵����
:: ���� - ��/k�� ������k����c���´������н������Զ��رգ�/k������
:: ���� - ��start/min�� ������С������